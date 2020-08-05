import React from 'react'

import wppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'


function TeacherItem() {
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/23510818?s=460&u=3adbef50695549031f159f63e661b693743701d2&v=4" alt="Vitor Dullens"/>
                <div>
                    <strong>Vitor Dullens</strong>
                    <span>Ciência da Computação</span>
                </div>
            </header>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Ea quos enim facere libero! Neque nisi dolorem placeat porro molestiae aliquam. 
                <br/><br/>
                Magnam excepturi nobis doloribus corporis saepe recusandae eligendi nostrum soluta.
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 100,00</strong>
                </p>
                <button type="button">
                    <img src={ wppIcon } alt="wpp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem

