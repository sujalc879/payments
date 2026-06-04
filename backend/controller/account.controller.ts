import type { Request, Response } from 'express';
import { accountModel, userModel } from '../db/db';

export async function getBalance(
    req: Request,
    res: Response
) {
    const userId = req.userId;

    const account = await accountModel.findOne({
        userId : userId
    });

    if (!account) {
        res.status(403).json({ message : "account not found"});
        return;
    };

    const balance = account.balance;

    res.status(200).json({ balance });
}

export async function transfer(
    req: Request,
    res: Response
) {
    
    const userId = req.userId;
    const transferAmount: number = req.body.transferAmount;
    const receipentEmail: string = req.body.email;
    
    const account = await accountModel.findOne({
        userId : userId
    });
    
    if (!account || !account.balance) {
        res.status(403).json({ message : "account not found or you dont have mony"});
        return;
    };
    
    const accountBalance = account.balance;
    
    if (transferAmount > accountBalance) {
        res.status(403).json({ message : "you dont have enough money to spend"});
        return;    
    }
    
    const receipentDetails = await userModel.findOne({
        email : receipentEmail
    });
    
    if (!receipentDetails) {
        res.status(403).json({ message : "receipent account does not exist, please check receipent address"});
        return;    
    };
    
    // make sure that user cant transfer into his own account
    if (receipentDetails._id.toString() === account.userId.toString()) {
        res.status(403).json({ message : "you cant transfer money into your own account"});
        return;    
        
    }
    
    const receipentAccount = await accountModel.findOne({
        userId : receipentDetails._id
    });
    
    
    if (!receipentAccount) {
        res.status(403).json({ message : "receipent account does not exist, please check receipent address (2)"});
        return;    
    };
    
    const remainingAmount = accountBalance - transferAmount;
    
    const debitMoney = await accountModel.findOneAndUpdate(
        {
            userId : userId
        },
        {
            $set : {
                balance : remainingAmount
            }
        }, {
            returnDocument : "after"
        }
    );
    
    if (!debitMoney) {
        res.status(403).json({ message : "money transfer fails"});
        return;    
        
    };

    const existingBalance = receipentAccount.balance;

    const totalTransferAmount = existingBalance! + transferAmount;
    
    const creditMoney = await accountModel.findOneAndUpdate(
        {
            userId : receipentAccount.userId
        }, {
            $set : {
                balance : totalTransferAmount
            }
        }
    );
    
    if (!creditMoney) {
        res.status(403).json({ message : "money transfer fails (2)"});
        return;    
        
    };

    res.status(200).json({
        message : "money transfers successfully",
        currentBalance : debitMoney.balance
    });

}

