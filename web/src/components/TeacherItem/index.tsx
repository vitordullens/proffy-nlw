import React from 'react'

import wppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api'

export interface Teacher {
    id: number
    name: string
    bio: string
    avatar: string
    subject: string
    cost: number
    whatsapp: string

}
interface TeacherItemProps {
    teacher: Teacher
}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        })
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={ teacher.avatar } alt="Avatar"/>
                <div>
                    <strong>{ teacher.name }</strong>
                    <span>{ teacher.subject }</span>
                </div>
            </header>
            <p>
                { teacher.bio }
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ { teacher.cost },00</strong>
                </p>
                <a target="_blank" onClick={ createNewConnection } href={`https://wa.me/${ teacher.whatsapp}?text=Quero%20marcar%20uma%20aula`}>
                    <img src={ wppIcon } alt="wpp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem

