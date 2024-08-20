import { ScrollView, TouchableOpacity } from 'react-native';
import { Center, VStack } from '@gluestack-ui/themed';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Text } from '@gluestack-ui/themed';
import { Input } from '@components/Input';

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: 'https://github.com/reisjonathan.png' }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center width="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input
              placeholder="E-mail"
              value="jonathan@email.com"
              bg="$gray600"
              isReadOnly
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
