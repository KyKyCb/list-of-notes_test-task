import React, {useState, useEffect} from 'react';

import NoteComponent from './components/NoteComponent/NoteComponent';
import NoteForm from './components/NoteForm/NoteForm'
import ListOfItems from './components/ListOfItems/ListOfItems'
import Button from './components/Button/Button';

import './App.scss'

const App = ()=>{
    const [listOfNotes, setListOfNotes] = useState({notes: []})
    const [tags, setTags] = useState([])
    const [filter, setFilter] = useState({isFiltered: false,
                                          filters: [],})

                                          

    //Если раньше были заметки, берем их из localStorage
    useEffect(()=>{
        if(localStorage.getItem('listOfNotes')){
            setListOfNotes({notes: JSON.parse(localStorage.getItem('listOfNotes'))})
        }
    }, [])

    //Добавляем каждую заметку в localStorage и собираем хештеги с заметок
    useEffect(()=>{
        localStorage.setItem('listOfNotes', JSON.stringify(listOfNotes.notes))
        

        if(listOfNotes.notes.length){
            let arrOfTags=[]
            listOfNotes.notes.forEach(note=>{
                    note.hashTags.forEach(tag=>{arrOfTags.push(tag)})
                    
            })
            setTags([...new Set(arrOfTags)])
        }else{
            setTags([])
        }

    }, [listOfNotes])


    //Фильтруем заметки по хештегу
    useEffect(()=>{
        if(filter.filters.length){
            if(tags.findIndex(tag=>tag === filter.filters[0]) === -1)
            {
                setFilter({isFiltered: false,
                          filters: [],})
            }
        }
    }, [tags, filter.filters])


    const createNote = (value, tags)=>{
        setListOfNotes({notes: [...listOfNotes.notes,
                                {title: value,
                                hashTags: tags,
                                isChange: false,
                                id: `${Math.random()}`,}]
        })
    };

    const isChangingNow=(id)=>{
        setListOfNotes(prevListOfNotes => 
            {
                return{
                    ...prevListOfNotes, 
                    notes: prevListOfNotes.notes.map(item=> 
                        {
                            if(item.id === id){
                                    return {...item, 
                                            isChange: (item.isChange) ? false : true}
                                }
                            return item
                        })
                    }
            })
    };

    const editNote = (value, id, tags)=>{
        setListOfNotes(prevListOfNotes => 
            {
                return{
                    ...prevListOfNotes, 
                    notes: prevListOfNotes.notes.map(item=> 
                        {
                            if(item.id === id){
                                    return {...item, 
                                            title: value,
                                            hashTags: tags}
                                }
                            return item
                        })
                    }
            })
        
        
    }

    const deleteNote = (id)=>{
        setListOfNotes({notes: listOfNotes.notes.filter((note)=> note.id !== id)});
    };

    const filterPick = (filterName)=>{
        setFilter(prevFilter=> {
            return {...prevFilter, 
                    isFiltered: true, 
                    filters: [...new Set([...prevFilter.filters, filterName])]}
        })
    }

    const filterCleaner = ()=>{
        setFilter({isFiltered: false,
            filters: [],})
    }
        
    return(
        <div>
            <div className = "listOfNotes-form">

                <NoteForm 
                updateNote = {createNote}  
                name={"Добавить в список"}
                />

            </div>


            {filter.isFiltered ?
                
                <ListOfItems 
                listName={'Фильтр по тегу'}
                className={'tagFilter'}
                ulClassName={'tagFilter-inline'}

                
                >
                    {
                        filter.filters.map(item=>{
                            return(
                                <li key={item}>
                                <div>

                                    <span 
                                    className={'listOfItems-tagName_big tagName'} 
                                    onClick={()=>filterPick(item)}
                                    >
                                        {item}
                                    </span>

                                    <Button 
                                        className ='listOfNotes-button-delete button' 
                                        onClick = {filterCleaner} 
                                        id = {item} 
                                        name = {'Очистить фильтр'}
                                        />
                                </div>
                                
                            </li>
                            )
                        })
                    }
                </ListOfItems>
            : null}
            
            {filter.isFiltered ?


                /*===========Отрисовываем отфильтрованные заметки============*/
                <ListOfItems 
                listName={'Заметки'}
                className={'container'}
                ulClassName={'notes'}
                >

                    {
                        listOfNotes['notes'].filter(item=> 
                            item.hashTags.findIndex(tag=>tag===filter.filters[0]) !==-1)
                            .map((config)=>{
                                return <NoteComponent
                                    editNote = {editNote}
                                    isChangingNow={isChangingNow}
                                    deleteNote={deleteNote}
                                    key = {config.id} 
                                    id = {config.id} 
                                    title={config.title}
                                    isChange={config.isChange}
                                    filterPick={filterPick}
                                    />
                        })
                    }
                    
                </ListOfItems>


            : ( /*===========Если фильтров нет отрисовываем все заметки============*/
                (listOfNotes['notes'].length) ?
                <ListOfItems 
                listName={'Заметки'}
                className={'container'}
                ulClassName={'notes'}
                >
                    {
                        listOfNotes['notes'].map((config)=>{ 
                        return <NoteComponent
                        editNote = {editNote}
                        isChangingNow={isChangingNow}
                        deleteNote={deleteNote}
                        key = {config.id} 
                        id = {config.id} 
                        title={config.title}
                        isChange={config.isChange}
                        filterPick={filterPick}
                        />})
                    }
                </ListOfItems>
                : <h1>{'Заметок пока нетъ :)'}</h1>
            )}


            {tags.length ?
            /*===========Отрисовываем все теги которые доступны============*/
                (
                    /*===========При выборе одного, закрываем список============*/
                filter.isFiltered ? null 
                :<ListOfItems 
                listName={'Список доступных тегов'}
                className={'tagFilters'}
                ulClassName={'tagFilters-inline'}
                >
                    <div className={'listOfItems-tagName-container'}>
                        {
                            tags.map((tag)=>{ 
                            return(
                                    
                                        <span 
                                        key={tag}
                                        className={'listOfItems-tagName-list tagName'} 
                                        onClick={()=>filterPick(tag)}
                                        >
                                            {tag}
                                        </span>
                                    
                            )
                            })
                        }
                </div>
            </ListOfItems>)
            : <h1>Тегов пока нет</h1>}
        </div>
        
    )
}

export default App

