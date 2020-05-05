import React, { useState, useEffect} from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      onwer: 'Cássio Rovaroto'
    });

    const project = response.data;
    setProjects([...projects, project]);
  }
  
  return (
    <>
      <StatusBar barStyle = 'dark-content' backgroundColor = '#7159c1' />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item }) => (
           <Text style={styles.project}>{item.title}</Text>
           )}
        />
        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button}
          onPress={handleAddProject}>
          <Text style={styles.textButton}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView> 
    </>
    /*<>
      <StatusBar barStyle = 'dark-content' backgroundColor = '#7159c1' />
        <View style={styles.container}>
          {projects.map(project => <Text style={styles.project} key={project.id}>{project.title}</Text>)} 
        </View>
    </>*/
    );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  project: {
    color: '#fff',
    fontSize: 20 
  }, 
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16
  },
});