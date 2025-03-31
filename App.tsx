import { useState } from 'react';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// Tipando o StackNavigator
type RootStackParamList = {
  FormularioAluno: undefined;
  ListarAlunos: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { Navigator, Screen } = createStackNavigator();

const TituloGeral = () => (
  <View style={styles.viewTitulo}>
    <Text style={styles.titulo}>Controle de Alunos</Text>
  </View>
);

interface Aluno {
  ra: number;
  nome: string;
  nascimento: string;
}

interface AlunoFormularioProps {
  onGravar: (ra: string, nome: string, nascimento: string) => void;
  navigation: NavigationProp;
}

const FormularioAluno = ({ onGravar, navigation }: AlunoFormularioProps) => {
  const [ra, setRa] = useState('');
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');

  const inputs = [
    { label: 'RA:', value: ra, setValue: setRa, keyboardType: 'numeric' },
    { label: 'Nome:', value: nome, setValue: setNome },
    { label: 'Nascimento:', value: nascimento, setValue: setNascimento },
  ];

  return (
    <View style={styles.viewFormulario}>
      <View style={styles.form}>
        {inputs.map(({ label, value, setValue, keyboardType = 'default' }) => (
          <View style={styles.viewInput} key={label}>
            <Text style={styles.textInput}>{label}</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => setValue(text.trim())}
            />
          </View>
        ))}
        <View style={styles.viewButton}>
          <Button title="Gravar" onPress={() => onGravar(ra, nome, nascimento)} />
          <Button title="Ir para Listagem" onPress={() => navigation.navigate('ListarAlunos')} />
        </View>
      </View>
    </View>
  );
};

const ItemAluno = ({ item }: ListRenderItemInfo<Aluno>) => (
  <View style={styles.itemLista}>
    <Text style={styles.textoRALista}>{item.ra}</Text>
    <Text style={styles.textoNormalLista}>{item.nome}</Text>
    <Text style={styles.textoNormalLista}>{item.nascimento}</Text>
  </View>
);

interface AlunoListagemProps {
  lista: Aluno[];
  navigation: NavigationProp;
}

const ListarAlunos = ({ lista, navigation }: AlunoListagemProps) => (
  <View style={styles.viewListagem}>
    <FlatList data={lista} renderItem={ItemAluno} keyExtractor={(item) => item.ra.toString()} />
    <View style={styles.botaoListagem}>
      <Button title="Ir para Formulário" onPress={() => navigation.navigate('FormularioAluno')} />
    </View>
  </View>
);

export default function App() {
  const [listaAlunos, setListaAlunos] = useState<Aluno[]>([]);

  const gravar = (ra: string, nome: string, nascimento: string) => {
    setListaAlunos((prevLista) => [
      ...prevLista,
      { ra: parseInt(ra, 10) || 0, nome: nome.trim(), nascimento: nascimento.trim() },
    ]);
  };

  return (
    <View style={styles.viewPrincipal}>
      <View style={styles.viewPrincipalTop}>
        <TituloGeral />
      </View>
      <View style={styles.viewPrincipalBottom}>
        <NavigationContainer>
          <Navigator>
            <Screen name="FormularioAluno" options={{ headerShown: false }}>
              {({ navigation }) => <FormularioAluno navigation={navigation} onGravar={gravar} />}
            </Screen>
            <Screen name="ListarAlunos" options={{ headerShown: false }}>
              {({ navigation }) => <ListarAlunos navigation={navigation} lista={listaAlunos} />}
            </Screen>
          </Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
  },
  viewPrincipalTop: {
    flex: 0.2,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPrincipalBottom: {
    flex: 0.8,
  },
  viewTitulo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 80,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewFormulario: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    paddingVertical: 50,
  },
  form: {
    width: '80%',
    padding: 30,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  textInput: {
    fontSize: 17,
    margin: 10,
    color: '#fff',
    width: 100,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#5263ff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    color: 'black',
    fontSize: 18,
  },
  viewButton: {
    alignSelf: 'center',
    marginTop: 20,
    gap: 10,
  },
  viewListagem: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  itemLista: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
  textoRALista: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoNormalLista: {
    fontSize: 16,
    color: 'black',
  },
  botaoListagem: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
