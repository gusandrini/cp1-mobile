//RM:557505 - Gustavo Sandrini

import { useState } from 'react';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

const TituloGeral = () => {
  return (
    <View style={styles.viewTitulo}>
      <Text style={styles.titulo}>Controle de Alunos</Text>
    </View>
  );
};

interface Aluno {
  ra: number;
  nome: string;
  nascimento: string;
}

interface AlunoFormularioProps extends ParamListBase {
  onGravar: (ra: string, nome: string, nascimento: string) => void;
}

const FormularioAluno = (props: AlunoFormularioProps): React.ReactElement => {
  const [ra, setRa] = useState('');
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');

  return (
    <View style={styles.viewFormulario}>
      <View style={styles.form}>
        <View style={styles.viewInput}>
          <Text style={styles.textInput}>RA:</Text>
          <TextInput style={styles.input} value={ra} onChangeText={setRa} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.textInput}>Nome:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.textInput}>Nascimento:</Text>
          <TextInput style={styles.input} value={nascimento} onChangeText={setNascimento} />
        </View>
        <View style={styles.viewButton}>
          <Button title="Gravar" onPress={() => props.onGravar(ra, nome, nascimento)} />
          <Button title="Ir para Listagem" onPress={() => props.navigation.navigate('ListarAlunos')} />
        </View>
      </View>
    </View>
  );
};

const ItemAluno = (props: ListRenderItemInfo<Aluno>): React.ReactElement => {
  return (
    <View style={styles.itemLista}>
      <Text style={styles.textoRALista}>{props.item.ra}</Text>
      <Text style={styles.textoNormalLista}>{props.item.nome}</Text>
      <Text style={styles.textoNormalLista}>{props.item.nascimento}</Text>
    </View>
  );
};

interface AlunoListagemProps extends ParamListBase {
  lista: Aluno[];
}

const ListarAlunos = (props: AlunoListagemProps): React.ReactElement => {
  return (
    <View style={styles.viewListagem}>
      <FlatList data={props.lista} renderItem={ItemAluno} />
      <View style={styles.botaoListagem}>
        <Button title="Ir para Formulario" onPress={() => props.navigation.navigate('FormularioAluno')} />
      </View>
    </View>
  );
};

export default function App() {
  const [listaAlunos, setListaAlunos] = useState<Aluno[]>([]);

  const gravar = (ra: string, nome: string, nascimento: string) => {
    const aluno = {
      ra: parseInt(ra),
      nome: nome,
      nascimento: nascimento,
    };

    const novaLista = [...listaAlunos, aluno];
    setListaAlunos(novaLista);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.viewPrincipal1}>
        <TituloGeral />
      </View>
      <View style={styles.viewPrincipal2}>
        <NavigationContainer>
          <Navigator>
            <Screen name="FormularioAluno" options={{ headerShown: false }}>
              {(navProps: ParamListBase) => <FormularioAluno {...navProps} onGravar={gravar} />}
            </Screen>
            <Screen name="ListarAlunos" options={{ headerShown: false }}>
              {(navProps: ParamListBase) => <ListarAlunos {...navProps} lista={listaAlunos} />}
            </Screen>
          </Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal1: {
    flex: 2, 
    backgroundColor: 'lightblue',
  },
  viewPrincipal2: {
    flex: 8,
  },
  viewTitulo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 400,
  },
  viewFormulario: {
    backgroundColor: 'lightblue',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 80,
  },
  form: {
    flex: 1,
    padding: 20,
    alignSelf: 'center',
    width: 700,
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  textInput: {
    fontSize: 20,
    color: 'white',
    width: 120,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'cyan',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 20,
  },
  viewButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    marginTop: 100,
    gap: 30,
  },
  viewListagem: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  itemLista: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 500,
    backgroundColor: '#FFFDD0',
    marginBottom: 20,
  },
  textoRALista: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  textoNormalLista: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  botaoListagem: {
    width: 350,
    paddingBottom: 75,
    marginTop: 28,
    alignSelf: 'center',
  },
});