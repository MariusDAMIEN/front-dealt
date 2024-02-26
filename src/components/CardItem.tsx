import React from 'react';
import { Card, Tag as TagAnt, Divider } from 'antd';
import { Card as CardType } from 'dashboard';

interface CardItemProps {
    card: CardType;
    openModal: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, openModal }) => {
    return (
        <Card onClick={openModal} title={card.title} bordered={false} style={{ overflowWrap: 'break-word', width: 'auto' }}>
            {card.tags.map((tag) => <TagAnt key={tag._id}>{tag.title}</TagAnt>)}
            {card.tags.length > 0 && <Divider />}
            {card.message}
        </Card>
    );
};

export default CardItem;
