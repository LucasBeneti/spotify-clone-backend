// TODO controller do user, onde ficarão todas as funções relacionadas a ele
// VER NA PARTE DE CONTRACTS
import database from '../database';
import type { User } from '../contracts/types';
// TODO /GET User info
export const getUserInfo = async ({ user_id }: { user_id: number }) => {
    try {
        const userInfo = await database('users').where({ id: user_id });

        return userInfo;
    } catch (error) {
        console.error('GET User error', error);
    }
};

// TODO /POST create user (don't know how much I'll use this)
export const create = async ({ username }: { username: string }) => {
    try {
        const newUser = await database('users').insert({ username });
        return newUser;
    } catch (error) {
        console.error('Error while creating user', error);
    }
};

export const deleteUser = async ({ user_id }: { user_id: number }) => {
    try {
        const deletedUser = await database('users')
            .where({ id: user_id })
            .del();

        return deletedUser;
    } catch (error) {
        console.error('Error while creating user', error);
    }
};

// TODO /POST follow artist

export const followArtist = async ({
    user_id,
    artist_id,
}: {
    user_id: number;
    artist_id: number;
}) => {
    try {
        // TODO currently trying to crete the migration to handle the new way to store
        // an array for this field, and adding a new one for following_users
        // const followRes = await database('users').where({id: user_id}).up
    } catch (error) {}
};

// TODO unfollow artist (don't know which verb)
