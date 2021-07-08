import React from 'react';

import Button from '../Button/Button';
import NoteForm from '../NoteForm/NoteForm';

import './NoteComponent.scss';

import reactStringReplace from 'react-string-replace'

const NoteComponent =  (props)=>{

    const {isChange, 
            deleteNote, 
            editNote, 
            isChangingNow, 
            title,  
            id, 
            filterPick} = props;

    const changingHandler=()=>{
        isChangingNow(id)
    };

    const updateNote = (value, tags)=>{ 
        editNote(value, id, tags);        
    };

    const deleteNoteHandler=()=>{
        deleteNote(id)
    }

    const filterHandler = (tag)=>{
        filterPick(tag)
    }

    return(
        <li>
        {
        (isChange) ? 
        <div className = "listOfNotes-form-change form">
            <NoteForm 
            title={title} 
            updateNote = {updateNote} 
            name={'Изменить'} id = {id} 
            editNote={changingHandler}
            />
        </div> 
            : <div>

                <span
                className={'listOfItems-content content'}
                id={id}>
                    {reactStringReplace(title, 
                        /(#[a-zа-я0-9][a-zа-я0-9\-_]*)/ig, 
                        (match, i)=> <span className={'listOfItems-tagName tagName'} onClick={()=>filterHandler(match)} key={i} href={'#'}>{match}</span>
                    )}
                </span>

                <div>
                    <Button 
                    className ='listOfNotes-button-change button' 
                    onClick = {changingHandler} 
                    id = {id} 
                    name = {'Изменить'}
                    />
                    <Button 
                    className ='listOfNotes-button-delete button' 
                    onClick = {deleteNoteHandler} 
                    id = {id} 
                    name = {'Удалить'}
                    />
                </div>                
            </div>
        
        }
        </li>
    )
}

export default NoteComponent;