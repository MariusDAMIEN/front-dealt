// noteApi.ts
import { Card } from 'dashboard';

export const fetchNotes = async (userId: string): Promise<Card[]> => {
    const query = await fetch(`http://127.0.0.1:3001/notes/${userId}`);
    return query.json();
};

export const createNote = async (values: any): Promise<any> => {
    try {
        const query = await fetch('http://127.0.0.1:3001/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return query;
    } catch (error) {
        console.log(error);

    }

};

export const updateNote = async (cardId: string, values: any): Promise<any> => {
    const query = await fetch(`http://127.0.0.1:3001/notes/${cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    return query.json();
};

export const deleteNote = async (cardId: string): Promise<any> => {
    const query = await fetch(`http://127.0.0.1:3001/notes/${cardId}`, {
        method: 'DELETE',
    });
    return query.json();
};
