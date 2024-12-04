
import style from './Card.module.css'
import Button from './Button'
import { useState } from 'react';
import { API_BASE_URI } from './MainSection';

const placeHolderSrc = 'https://picsum.photos/1200/1000'


let tag_css = ''

export function setClass(el, classe) {
    el = ''
    switch (classe) {

        case 'html':
            el = 'html';
            break;

        case 'js':
            el = 'js';
            break;

        case 'php':
            el = 'php';
            break;

        case 'css':
            el = 'css';
            break;

    }
    return el

}




export function Card({ id = '', title = '', image = '', description = '', tags = [], author = '', isPublished = true, deleteFunction = () => { }, onUpdateTitle = () => { } }) {
    // console.log(tags)

    console.log('Rendering Card');


    const [cardtitle, setCardTitle] = useState(title)

    const [isActive, setIsActive] = useState(false)



    function updateCardTitle(e) {
        e.preventDefault();
        if (cardtitle.trim()) {
            //onUpdateTitle(cardtitle, id);
            onUpdateTitle(cardtitle);
            setCardTitle(cardtitle);
            toggleActive()
        }
    };


    function toggleActive() {
        setIsActive(!isActive)
    };


    return (
        <div className={style.card}>
            <div className={style.card_header}>
                <div className="figure">
                    <img src={image ? `${API_BASE_URI}${image}` : placeHolderSrc} alt="" />
                </div>
            </div>
            <div className={style.card_body}>
                <div className={style.title}>
                    {!isActive ?
                        <h3 className={''} onClick={toggleActive}>{cardtitle}</h3> :
                        <form action="" onSubmit={updateCardTitle} className={''}>
                            <input type="text" name="title" value={cardtitle} onChange={(e) => setCardTitle(e.target.value)} />
                            <input type="submit" value="Aggiorna" />
                        </form>
                    }

                </div>
                {tags.length ? <div>{tags.map((tag, i) => <span key={i} className={setClass(tag_css, tag)}>{tag}</span>)}</div> : <div>Nessun tag </div>}
                <p className={style.description}>
                    {description}
                </p>
                <div className={style.author}>{`Autore: ${author}`}</div>
                <Button />
                <button onClick={deleteFunction}>elimina</button>

                {isPublished ?
                    <div>Pubblicato</div> :
                    <div>Draft</div>
                }


            </div>
        </div>

    )
}