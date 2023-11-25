import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList , Image} from 'react-native';
import { Slider } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';


const FormComponent = ({ initialData, onSubmit, onClose }) => {
  const [title, setTitle] = useState(initialData.name || '');
  // const [subtasks, setSubtasks] = useState(
  //   initialData.subtasks.map(subtask => ({ title: subtask, checked: false }))
  // );
  const [dueDate, setDueDate] = useState(new Date(initialData.due || new Date()));
  const [repeat, setRepeat] = useState(initialData.repeat || 'Never');
  const [description, setDescription] = useState(initialData.description || '');
  const [assignTo, setAssignTo] = useState(initialData.assignedTo || 'Self');
  const [priority, setPriority] = useState(initialData.points || 1);

  // const handleSubtaskChange = (text, index) => {
  //   const newSubtasks = [...subtasks];
  //   newSubtasks[index] = { ...newSubtasks[index], title: text };
  //   setSubtasks(newSubtasks);
  // };

  // const toggleSubtaskChecked = (index) => {
  //   const newSubtasks = [...subtasks];
  //   newSubtasks[index].checked = !newSubtasks[index].checked;
  //   setSubtasks(newSubtasks);
  // };

  // const addSubtask = () => {
  //   setSubtasks([...subtasks, { title: '', checked: false }]);
  // };

  // const deleteSubtask = (index) => {
  //   const newSubtasks = subtasks.filter((_, i) => i !== index);
  //   setSubtasks(newSubtasks);
  // };

  const handleSubmit = () => {
    const formData = {
      name: title,
      // subtasks,
      due: dueDate,
      repeat: repeat,
      assignedTo: assignTo,
      description: description,
      points: priority,
    };
    onSubmit(formData);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
  };

  // const renderSubtaskItem = ({ item, index }) => (
  //   <View style={styles.subtaskContainer}>
  //     <TouchableOpacity onPress={() => toggleSubtaskChecked(index)}>
  //       <Text style={styles.checkbox}>{item.checked ? '☑' : '☐'}</Text>
  //     </TouchableOpacity>
  //     <TextInput
  //       style={styles.input}
  //       placeholder={`Subtask ${index + 1}`}
  //       value={item.title}
  //       onChangeText={(text) => handleSubtaskChange(text, index)}
  //     />
  //     <TouchableOpacity onPress={() => deleteSubtask(index)}>
  //       <FontAwesome5 name="trash-alt" size={20} color="black" marginLeft={10} />
  //     </TouchableOpacity>
  //   </View>
  // );
 

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    }}>
      <View style={{
        margin: 20,
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
        <ScrollView style={styles.container}>
          <View style={styles.inputAndLabel}>
            {/* <Text style={styles.fieldTitle}>Task Title</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          

          {/* <Text style={styles.fieldTitle}>Subtasks</Text>
          <FlatList
            data={subtasks}
            renderItem={renderSubtaskItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
            <TouchableOpacity style={styles.addSub} onPress={addSubtask}>
              <Image source={require('../assets/add.png')} style={styles.addImg} /> 
              <Text style={{ color: 'purple' }}>Add Subtask</Text>
            </TouchableOpacity>}
            scrollEnabled={false} // Disable scrolling for the FlatList
          /> */}
          <View style={styles.inputAndLabel}>
            <Text style={styles.fieldTitle}>Due Date:</Text>
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              style={styles.datePicker}
            />
          </View>
          
          <View style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // paddingHorizontal: '20%',
            paddingTop: 10
          }}>
            <Text style={[styles.fieldTitle, {
              flex: 1,
              textAlign: 'center'
            }]}>Repeat:</Text>
            <Text style={[styles.fieldTitle, {
              flex: 1,
              textAlign: 'center'
            }]}>Assign To:</Text>
          </View>

          <View style={styles.inputAndLabel}>
            <Picker
              selectedValue={repeat}
              style={styles.picker}
              itemStyle={{fontSize: 15, height: 100}}
              onValueChange={(itemValue) => setRepeat(itemValue)}
            >
              {/* Picker Items */}
              <Picker.Item label="Never" value="Never" />
                <Picker.Item label="Daily" value="Daily" />
                <Picker.Item label="Weekly" value="Weekly" />
                <Picker.Item label="Monthly" value="Monthly" />
            </Picker>

            <Picker
              selectedValue={assignTo}
              style={styles.picker}
              itemStyle={{fontSize: 15, height: 100}}
              onValueChange={(itemValue) => setAssignTo(itemValue)}
            >
              {/* Picker Items */}
              <Picker.Item label="You" value="You" />
              <Picker.Item label="Sara" value="Sara" />
              <Picker.Item label="Lara" value="Lara" />
              <Picker.Item label="Lino" value="Lino" />
            </Picker>
          </View>
          
          <TextInput
            style={[styles.input, {
              fontSize: 12,
              height: 110
            }]}
            enterKeyHint='enter'
            placeholder="Description"
            value={description}
            multiline={true}
            onChangeText={setDescription}
          />

          <Text style={[styles.fieldTitle, {
            alignSelf: 'center', 
            paddingTop: 10
          }]}>Nuts</Text>
          <Slider
            // style={styles.slider}
            thumbStyle={{ height: 30,
              width: 30,
              backgroundColor: 'transparent',
              justifyContent: 'center',
            }}
            value={priority}
            onValueChange={setPriority}
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor='purple'
            maximumTrackTintColor='black'
            allowTouchTrack
            thumbProps={{
              children: (
                <Image source={require('../assets/nut.png')} style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  
                }}/>
              )
            }}
          />
          
          <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            paddingBottom: 5
          }}>{priority}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.inputAndLabel}>
              <Button title='Done' onPress={handleSubmit} />
              <Button title='Cancel' onPress={onClose} />
            </View>  
          </View>
          
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '100%',
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '500',
    // marginBottom: 5,
  },
  inputAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 20,
    // marginBottom: 10,
  },
  datePicker: {
    // marginBottom: 10,
  },
  picker: {
    width: '50%',
    // marginBottom: 10,
  },
  slider: {
    width: '100%',
    marginBottom: 10,
    color:'purple'
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  checkbox: {
    fontSize: 22,
    marginRight: 10,
  },
  deleteSubtask: {
    fontSize: 22,
    marginLeft: 10,
    color: 'red',
  },
  addSub: {
    fontSize: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
      display: 'row'
      
  },
  addImg: {
    height:15,
    width:15,
    marginRight:10,
  }
  // Additional styles
});
export default FormComponent;