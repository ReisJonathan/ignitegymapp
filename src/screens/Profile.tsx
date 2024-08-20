import { ScrollView } from 'react-native';
import { Center, VStack } from '@gluestack-ui/themed';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center>
          <UserPhoto
            source={{ uri: 'https://github.com/reisjonathan.png' }}
            alt="Foto do usuário"
            size="xl"
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
