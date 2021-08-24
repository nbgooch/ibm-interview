/* eslint-disable one-var */
import { Request, Response, Router } from 'express';
import UserModel from '../model/user.model';
import _ from 'lodash';
const userRouter = Router();

userRouter.get('/:id', getUserById);
userRouter.get('', getUsers);
userRouter.post('', createUser);

/**
 * createUser
 *
 * @param req
 * @param res
 * @returns UserModel
 */
export async function createUser(req: Request, res: Response) {
  const { name, email, favoriteFood, favoriteColor } = req.body,
    user = await new UserModel({
      name: name,
      email: email,
      favoriteFood: favoriteFood,
      favoriteColor: favoriteColor,
    }).save();

  return res.status(201).send(user);
}
/**
 * createUser
 *
 * @param req
 * @param res
 * @returns UserModel
 */
export async function getUsers(_: Request, res: Response) {
  const users = await UserModel.find();

  return res.status(200).send(users);
}
/**
 * createUser
 *
 * @param req
 * @param res
 * @returns UserModel
 */
export async function getUserById(req: Request, res: Response) {
  const { id } = req.params,
    user = await UserModel.findOne({ _id: id });

  return res.status(200).send(user);
}
export default userRouter;
