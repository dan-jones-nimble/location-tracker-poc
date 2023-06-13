import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ReactNode } from 'react';

interface MapModalProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
  title: string;
}

export const MapModal = ({
  isVisible,
  children,
  onClose,
  title
}: MapModalProps) => (
  <Modal animationType="slide" transparent visible={isVisible}>
    <View style={styles.overlayContent}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onClose}>
          <MaterialIcons name="close" color="#fff" size={22} />
        </Pressable>
      </View>
      {children}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlayContent: {
    height: '85%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0
  },
  titleContainer: {
    backgroundColor: '#464C55',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 12
  }
});
