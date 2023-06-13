import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ReactNode, useMemo, useState } from 'react';

interface Selector {
  id: string;
  node: ReactNode;
}

interface TopLevelSelector extends Selector {
  children: Array<Selector>;
}

interface MultiLevelSelectorProps {
  topLevelSelectors: Array<TopLevelSelector>;
}

const buildNode = (id: string) => <Text>{'Click Me: ' + id}</Text>;

export const MultiLevelSelector = () => {
  const fakeProps: MultiLevelSelectorProps = {
    topLevelSelectors: [
      {
        id: 'firstTL',
        node: buildNode('1'),
        children: [
          { id: 'firstChildTL', node: buildNode('1i') },
          { id: 'firstChildTL', node: buildNode('1ii') }
        ]
      }
    ]
  };
  const [selectorSelectedId, setSelectorSelectedId] = useState<string>();

  const selectedSelector = useMemo(
    () =>
      fakeProps.topLevelSelectors.find(
        (selector) => selector.id === selectorSelectedId
      ),
    [fakeProps, selectorSelectedId]
  );
  const topLevelSelectorPress = (selectorId: string) => {
    selectorSelectedId === selectorId
      ? setSelectorSelectedId(null)
      : setSelectorSelectedId(selectorId);
  };

  return (
    <View style={styles.blackBackground}>
      <View style={styles.wrapper}>
        {fakeProps.topLevelSelectors.map((parentSelector) => {
          return (
            <Pressable
              onPress={() => topLevelSelectorPress(parentSelector.id)}
              style={styles.buttonContainer}
              key={parentSelector.id}
            >
              {parentSelector.node}
            </Pressable>
          );
        })}
        {selectorSelectedId && (
          <View style={[styles.buttonContainer]}>
            {selectedSelector.children.map((childSelector) => (
              <Pressable>{childSelector.node}</Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blackBackground: {
    backgroundColor: 'black',
    padding: 8
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonContainer: {
    backgroundColor: '#ffffff99',
    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 8
  }
});
