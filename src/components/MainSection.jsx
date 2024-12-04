// import { posts as initialPosts } from '../data/posts.js'
import { Card, setClass } from './Card.jsx'
import style from './MainSection.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';





// const postsTags = initialPosts.map(post => post.tags).flat()

function filtraTagUnici(array) {
    return array.filter((el, i) => array.indexOf(el) === i);
}

// console.log(filtraTagUnici(postsTags))

const tags = [
    {
        id: 1,
        name: "HTML"
    },
    {
        id: 2,
        name: "CSS"
    },
    {
        id: 3,
        name: "JS"
    },
    {
        id: 4,
        name: "PHP"
    },

]

export const API_BASE_URI = 'http://localhost:3000/'

export default function MainSection() {

    //================= VARIABILI REATTIVE
    const postiniziale = []

    const [posts, setPosts] = useState(postiniziale);
    // const [author, setAuthor] = useState('');
    // const [title, setTitle] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [tagChecked, setTagChecked] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        image: '',
        isPublished: true,
        content: '',
        tags: ['placeholdertags']

    });




    //FUNZIONE PER CHIAMARE IL SERVER=========================================


    function fetchposts() {
        axios.get(`${API_BASE_URI}posts`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    // use effect per al montaggio del componente

    useEffect(() => {
        fetchposts()


    }, [])




    //==============================================
    function handleTag(e) {
        console.log('ciao')

    }

    //==================console.log()



    useEffect(() => {
        if (!formData.isPublished) {
            setIsActive(true)

        } else {
            setIsActive(false)
        }

    }, [formData.isPublished])


    // ======================================= HANDLE DEL FORM
    function handleFormData(e) {


        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData((formData) => (
            {
                ...formData,
                [e.target.name]: value
            }
        ))



    }



    //================================================  FUNZIONE AGGIUNGERE UN POST 


    function addPost(e) {
        e.preventDefault();

        // const newTitle = title;
        // const newAuthor = author;

        const newPost = {
            ...formData

        };
        console.log(formData)

        axios.post(`${API_BASE_URI}posts`, newPost)
            .then(res => {
                setPosts([...posts, res.data])
                setFormData({
                    title: '',
                    author: '',
                    image: '',
                    content: '',
                    isPublished: true,
                    tags: ['placeholdertags']
                })


            }).catch(err => {
                console.log(err);

            })


        // setPosts([...posts]);
        // // setTitle('');
        // // setAuthor('');
        // setFormData({
        //     title: '',
        //     author: '',
        //     image: '',
        //     content: '',
        //     isPublished: true,
        //     tags: ['placeholdertags']
        // })

    }

    //================================================  FUNZIONE ELIMINARE UN POST 

    function deletePost(currentPost) {
        setPosts(posts.filter(post => post !== currentPost))

    }
    //================================================  FUNZIONE MODIFICARE UN POST 

    function updateTitle(cardtitle, index) {

        console.log(cardtitle, index);

        //setPosts((oldPosts) => oldPosts.map((post) => post.id === id ? { ...post, title: cardtitle } : post))
        //console.log(posts)

    }

    // ==============================  HTML

    return (
        <main>
            <section>
                <div className="container">

                    <form onSubmit={addPost} action="" className="main_form" >
                        <div>
                            <label htmlFor="title">Nome</label>
                            <input type="text" name='title' placeholder="titolo" value={formData.title} onChange={handleFormData} />
                        </div>

                        <div>
                            <label htmlFor="author">Autore</label>
                            <input type="text" name='author' placeholder="Autore" value={formData.author} onChange={handleFormData} />
                        </div>

                        <div>
                            <label htmlFor="content">contenuto</label>
                            <input type="text" name='content' placeholder="contenuto" value={formData.content} onChange={handleFormData} />
                        </div>

                        <div>
                            <label htmlFor="image">Immagine</label>
                            <input type="text" name='image' placeholder="immagine" value={formData.image} onChange={handleFormData} />
                        </div>

                        {/* <div>
                            <h4>tags</h4>
                            <ul>
                                {tags.map(tag => (
                                    <li key={tag.id}>
                                        <input type="checkbox" name={tag.name} checked={tagChecked} onChange={handleTag} />
                                        <label htmlFor={tag.name}>{tag.name}</label>
                                    </li>
                                ))}

                            </ul>
                        </div> */}

                        <div>
                            <label htmlFor="isPublished">pubblicato</label>
                            <input type="checkbox" name='isPublished' checked={formData.isPublished} onChange={handleFormData} />
                        </div>
                        {isActive &&
                            <div>il post verrà salvato come bozza</div>
                        }

                        <input type="submit" value="Aggiungi post" />
                    </form>

                </div>

            </section>
            <section className='main_section'>
                <div className="container">
                    <div className="row">
                        {posts.map((post, index) => (
                            <div key={post.id} className="col_4">
                                <Card id={post.id} title={post.title} image={post.image} description={post.content} tags={post.tags} author={post.author} isPublished={post.isPublished} deleteFunction={() => deletePost(post)} onUpdateTitle={(title) => updateTitle(title, index)} />
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            <section>
                {/* <div className="tags">
                    {filtraTagUnici(postsTags).map((tag, i) => (
                        <div className={setClass(tag, tag)} key={i}>{tag}</div>

                    ))}

                </div> */}
            </section>
        </main>
    )
}