// helpers.ts
import { notification, Form, FormInstance, Modal, SelectProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, NotificationType, Tag } from 'dashboard'

export const searchInCards = (searchText: string, filteredCards: Card[], setFilteredCards: React.Dispatch<React.SetStateAction<Card[]>>) => {
    const filteredCardsUpdt = filteredCards.filter((card) =>
        card.title.toLowerCase().includes(searchText.toLowerCase()) ||
        card.message.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCards(filteredCardsUpdt);
};

export const showModal = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalOpen(true);
};

export const handleChange = (value: string, tags: Tag[], setOptions: React.Dispatch<React.SetStateAction<SelectProps['options']>>) => {
    const options = tags.map((tag) => ({
        label: tag.title,
        value: tag.title,
    }));
    setOptions(options);
};

export const handleOk = async (
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    form: FormInstance,
    session: any,
    cards: Card[],
    setFilteredCards: React.Dispatch<React.SetStateAction<Card[]>>,
    setCards: React.Dispatch<React.SetStateAction<Card[]>>,
    api: any
) => {
    setIsModalOpen(false);
    form.validateFields({ validateOnly: true })
        .then(async (values) => {
            values.user = session.data?.user.id;
            const tagsToUpdt: { title: string }[] = [];
            values.tags.map((value: any) => {
                tagsToUpdt.push({ title: value });
            });
            values.tags = tagsToUpdt;

            const query = await fetch('http://127.0.0.1:3001/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const response = await query.json();

            setFilteredCards([response, ...cards]);
            setCards([response, ...cards]);

            openNotificationWithIcon(api, 'success');
        })
        .catch(() => {
            openNotificationWithIcon(api, 'error');
        });

    Modal.destroyAll();
};

export const handleCancel = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setCards: React.Dispatch<React.SetStateAction<Card[]>>) => {
    setIsModalOpen(false);
    // setCards([]); // This line may need adjustment based on your requirements
    Modal.destroyAll();
};

export const updateCards = (cards: Card[], setFilteredCards: React.Dispatch<React.SetStateAction<Card[]>>, setCards: React.Dispatch<React.SetStateAction<Card[]>>) => {
    setFilteredCards([...cards]);
    setCards([...cards]);
};

export const openModal = (card: Card | null, setModalViewOpen: React.Dispatch<React.SetStateAction<boolean>>, setSelectedCard: React.Dispatch<React.SetStateAction<Card | null>>) => {
    setSelectedCard(card);
    setModalViewOpen(true);
};

export const openNotificationWithIcon = (api: any, type: NotificationType) => {
    api[type]({
        message: type === 'success' ? "La note a été ajoutée avec succès !" : type === 'error' ? "Une erreur s'est produite" : "default",
    });
};
