import React, { useState } from 'react';
import type { FormInstance, SelectProps } from 'antd';
import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import { Card } from 'dashboard';
import { useSession } from 'next-auth/react';
const { TextArea } = Input;

interface SubmitButtonProps {
  form: FormInstance;
  card: Card | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: (cards: Card[]) => void;
  cards: Card[];
  resetModal: boolean;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ setResetModal, resetModal, cards, card, form, children, setModalVisible, setCards }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], form);
  const session = useSession();


  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values, card]);

  const handleSubmit = async () => {
    form
      .validateFields({ validateOnly: true })
      .then(async () => {
        values.user = session.data?.user.id


        const tagsToUpdt: { title: string }[] = [];

        values.tags.map((value: any) => {
          tagsToUpdt.push({ title: value.value ? value.value : value });
        });

        values.tags = tagsToUpdt;
        const query = await fetch('http://127.0.0.1:3001/notes/' + card?._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Assurez-vous d'utiliser le type de contenu approprié
          },
          body: JSON.stringify(values),
        });
        const response = await query.json();


        const t = cards.findIndex(card => card._id === response._id);

        cards[t].message = response.message;
        cards[t].title = response.title;
        cards[t].tags = response.tags;


        setCards(cards);
        form.resetFields();
        setResetModal(!resetModal)

      })
      .catch((error) => {

      })
    setModalVisible(false);


  }
  return (
    <Button type="primary" htmlType="submit" onClick={handleSubmit} disabled={!submittable}>
      {children}
    </Button>
  );
};

interface UpdateModalFormProps {
  card: Card | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setCards: (cards: Card[]) => void
  modalVisible: boolean
  cards: Card[]
}

const UpdateModalForm: React.FC<UpdateModalFormProps> = ({ card, setModalVisible, modalVisible, setCards, cards }) => {
  const [form] = Form.useForm();
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [resetModal, setResetModal] = useState(false)

  React.useEffect(() => {
    if (card) {
      const newOptions = card.tags.map(tag => ({
        label: tag.title,
        value: tag.title,

      }));
      setOptions(newOptions);

      form.setFieldsValue({ message: card?.message, title: card?.title, tags: newOptions })
    }
  }, [card, resetModal]);

  const handleCancelView = () => {
    setModalVisible(false);
  }

  const setCardsUpt = (cards: Card[]) => {
    setCards(cards);
  }
  const deleteNote = async () => {
    const query = await fetch('http://127.0.0.1:3001/notes/' + card?._id, {
      method: 'DELETE',
    });
    const response = await query.json();
    setCards(cards.filter((card) => card._id !== response._id));
    setModalVisible(false);
    Modal.destroyAll(); // Fermer toutes les modales
  }

  return (
    <Modal
      title={"Modifier la Note"}
      open={modalVisible}
      closable={true}
      destroyOnClose={true}
      width={"80%"}
      footer={null}
      keyboard={true}
      className="modal-responsive-height"
    >
      <Form form={form} initialValues={{ title: card?.title, message: card?.message, tags: card?.tags }} name="validateOnly" layout="vertical" autoComplete="off">
        <Form.Item name="tags" label="Tags" rules={[{ required: false }]}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            options={options}
          />
        </Form.Item>
        <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="message" label="Message" rules={[{ required: true }]}>
          <TextArea rows={4} autoSize={{ minRows: 15, maxRows: 15 }} />
        </Form.Item>
        <Form.Item>
          <Flex gap="small" wrap="wrap" style={{ textAlign: 'right' }} justify={'flex-end'}>
            <Button type='primary' onClick={deleteNote} danger >Supprimer</Button>
            <Button htmlType="reset" >Reset</Button>
            <Button onClick={handleCancelView} >Annuler</Button>
            <SubmitButton setResetModal={setResetModal} resetModal={resetModal} cards={cards} setCards={setCardsUpt} card={card} form={form} setModalVisible={setModalVisible}>Soumettre</SubmitButton>
          </Flex>
        </Form.Item>
      </Form>

    </Modal>

  );
};

export default UpdateModalForm;