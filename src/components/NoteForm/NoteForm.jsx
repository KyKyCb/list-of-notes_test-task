import React, {useState} from 'react';

import Button from '../Button/Button';

import './NoteForm.scss'

const NoteForm = (props)=>{

    const [note, setNote] = useState({value: props.title ? props.title : ''})

    const valueToNote = () => {
        const tags = hashTagCatcher()
        if(note.value.trim()){
            props.updateNote(note.value, tags);
            setNote({value: ''});
        };
        setNote({value: ''});
    };

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        if (props.id && note.value.trim()){
            valueToNote()
            props.editNote(props.id)
        }
        if (!props.id){
            valueToNote()
        }
        setNote({value: ''});
    };

    const onChangeHandler = (event)=> {
        setNote({value: event.target.value});
        
    };

    const hashTagCatcher = ()=>{
        
    let arrOfHashTags = note.value.split(' ')
                        .filter(word => word.split('')
                                        .findIndex(str => str==='#')!==-1)
        
    arrOfHashTags = arrOfHashTags.map(word=>{

            let indexOfHash = word.split('').findIndex(str => str==='#')

            if(word[word.length-1] === ',' || word[word.length-1] === '.')
            {
                return  word.split('').splice(indexOfHash, word.length-1).join('')
            }
            return word.split('').splice(indexOfHash, word.length).join('')
        })
        return [...new Set(arrOfHashTags)]
    }

        return (
            <form  
            onSubmit = {onSubmitHandler} 
            id={props.id}
            >
                <input 
                id={'myinput'} 
                type="text" 
                value = {note.value} 
                placeholder = 'Введите вашу задачу' 
                onChange = {onChangeHandler}
                /> 

                <Button 
                name = {props.name} 
                type = "submit"
                />
            </form>  
        )
};

export default NoteForm;


