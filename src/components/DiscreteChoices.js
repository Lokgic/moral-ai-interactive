import React from 'react'
import {
    Button
} from 'semantic-ui-react'

export default ({currentChosen,name0,name1,makeSelection} )=> (<Button.Group fluid>

    <Button color={currentChosen === name0
        ? "teal"
        : "grey"} onClick={() => makeSelection([1,0])}>
        {name0}
    </Button>
    <Button.Or/>
    <Button color={currentChosen === name1
        ? "teal"
        : "grey"} onClick={() => makeSelection([0,1])}>
        {name1}
    </Button>
</Button.Group>)
