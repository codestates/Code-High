import { Request, Response } from 'express'

export const userList = (req: Request, res: Response) => {
    
}

export const userInfo = (req: Request, res: Response) => {
  console.log(req.body.authUser)
  res.send('userInfo')
}

export const userInfoById = (req: Request, res: Response) => {

}

export const editUser = (req: Request, res: Response) => {

}

export const deleteUser = (req: Request, res: Response) => {
  
}