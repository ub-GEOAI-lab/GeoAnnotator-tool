import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-colors";
import { Card, Form } from "react-bootstrap";
import Creatable from 'react-select/creatable';
import { Leafletmap } from "./leafletmap";
import './Submit_form.css'
export const Submit_form = () => {
    const [tweet, setTweet] = useState('No Data')
    const [isloading, setIsloading] = useState(true)
    const [refresh, setRefresh] = useState(0)
    const [hightlighttext, setHighlighttext] = useState({})
    const category_options = [
        { value: 'C7', label: 'C7:Other human-made' },
        { value: 'C5', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const chosenColors = [
        '#B80000']
    useEffect(() => {
        fetch('/api').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            setTweet(data)
            setIsloading(false)
        }
        )

    }, [])
    const handleClick = () => {
        setRefresh(refresh + 1)
        console.log(hightlighttext)

    }
    if (isloading) {
        return <h1>loading...</h1>;
    }

    return (
        <>

            <Form>
                <div className="row">
                    <div className="column">
                        <Leafletmap />
                    </div>
                    <div className="column" >
                        {/* Annotator might be removed soon*/}
                        <div class="row">
                            <label>
                                Annotator: <input type="text" />
                            </label>
                        </div>
                        <div class="row">
                            <Card>
                                <Card.Header>Please Highlight Tweet Location</Card.Header>
                                <Card.Body>
                                    <Highlighter text={tweet}
                                        colors={chosenColors}
                                        export={(highlightedtext) => {
                                            setHighlighttext(highlightedtext)
                                        }}
                                        key={refresh}
                                    />
                                    <button variant="primary" onClick={handleClick}>Refresh Highlight</button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div class="row">
                            <label>
                                Category: <Creatable options={category_options} />
                            </label>
                        </div>
                    </div>
                </div>


            </Form>
        </>
    )
}