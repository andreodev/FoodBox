import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface MealItemProps {
  meal: {
    id: string;
    title: string;
    value: string;
    editing: boolean;
  };
  isSelected: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeValue: (id: string, text: string) => void;
  onChangeTitle: (id: string, text: string) => void; // recebe essa prop para alterar título
  onSave: (id: string) => void;
}

const MealItem: React.FC<MealItemProps> = ({
  meal,
  isSelected,
  onEdit,
  onDelete,
  onChangeValue,
  onChangeTitle,
  onSave,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<'delete' | 'save' | null>(null);

  const openModal = (action: 'delete' | 'save') => {
    setActionToConfirm(action);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (actionToConfirm === 'delete') {
      onDelete(meal.id);
    } else if (actionToConfirm === 'save') {
      onSave(meal.id);
    }
    setModalVisible(false);
    setActionToConfirm(null);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setActionToConfirm(null);
  };

  return (
    <View style={isSelected ? styles.mealBlockSelected : styles.mealBlock}>
      <View style={styles.mealHeader}>
        {meal.editing ? (
          <TextInput
            style={[styles.mealInput, { flex: 0.8, marginRight: 8 }]}
            value={meal.title}
            onChangeText={text => onChangeTitle(meal.id, text)}
            placeholder="Título da refeição"
          />
        ) : (
          <Text style={styles.mealTitle}>{meal.title}:</Text>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => onEdit(meal.id)}>
            <MaterialIcons name="edit" size={20} color="#F97316" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('delete')} style={{ marginLeft: 10 }}>
            <MaterialIcons name="delete" size={20} color="#F97316" />
          </TouchableOpacity>
        </View>
      </View>
      {meal.editing ? (
        <View>
          <TextInput
            style={[styles.mealInput, { minHeight: 80, textAlignVertical: 'top' }]}
            multiline={true}
            value={meal.value}
            onChangeText={text => onChangeValue(meal.id, text)}
            placeholder="Digite o(s) elemento(s) do item"
          />
          <TouchableOpacity onPress={() => openModal('save')} style={{ marginTop: 8, alignSelf: 'flex-end' }}>
            <MaterialIcons name="check" size={24} color="#F97316" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.mealText}>{meal.value}</Text>
      )}

      {/* Modal de confirmação */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {actionToConfirm === 'delete'
                ? 'Tem certeza que deseja excluir esta refeição?'
                : 'Deseja salvar as alterações desta refeição?'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mealBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  mealBlockSelected: {
    backgroundColor: '#FFF7ED',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderColor: '#F97316',
    borderWidth: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  mealTitle: {
    fontWeight: 'bold',
    color: '#F97316',
    fontSize: 15,
  },
  mealText: {
    color: '#222',
    fontSize: 14,
  },
  mealInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F97316',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#222',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#F97316',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MealItem;
