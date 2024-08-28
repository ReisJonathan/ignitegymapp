import React, { useCallback, useEffect, useState } from 'react';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import {
  Heading,
  HStack,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { FlatList } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import { ExerciseCard } from '@components/ExerciseCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

export function Home() {
  const toast = useToast();

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      console.log(response.data);
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.';

      toast.show({
        placement: 'top',
        render: () => (
          <Toast action="error" variant="outline" bgColor="$red500">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.';

      toast.show({
        placement: 'top',
        render: () => (
          <Toast action="error" variant="outline" bgColor="$red500">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>

          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
