import { signToken, AuthenticationError } from "../utils/auth";
import { User } from "../models/User.js";
import { login } from "../controllers/user-controller";

interface User {
    username: string;
    email: string;
    password: string;
    bookCount: number;
}

interface saveBook {
    bookinfo: {
        authors: string[];
        description: string;
        title: string;
        bookId: string;
        image: string;
        link: string;
    }
}

const resolvers = {
    Query: {
        Users: async () => {
            return User.find();
        },
    },
};

Mutation: {
    login: async (_parent: unknown, { email, password }: {email: string; password: string}): Promise<{ token: string; user: User }> => {
        const user = await User.findOne({email});
        if (!user) {
            throw new AuthenticationError('No user found');
        }
        const matchingPw = await user.checkPw(password);
        if (!matchingPw) {
            throw new AuthenticationError('Incorrect password');
    }
    const token = signToken(user.username, user.email, user.password);
    return { token, user };
    }
};

export default resolvers;