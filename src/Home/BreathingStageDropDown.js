import { DropdownMenu, DropdownItem } from 'reactstrap';
import { getLast, getCurrentPosition } from '../util'

function BreathingStageDropDown(props) {
    let last = getLast(props.states)

    let breathingPos = getCurrentPosition(props.states)

    if (last === undefined)
        return (
            <DropdownMenu>
                <DropdownItem onClick={e => props.addStage('In')}>In</DropdownItem>
                <DropdownItem disabled onClick={e => props.addStage('Out')}>Out</DropdownItem>
                <DropdownItem onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
            </DropdownMenu>)

    if (breathingPos === 1)
        return (
            <DropdownMenu>
                <DropdownItem disabled onClick={e => props.addStage('In')}>In</DropdownItem>
                <DropdownItem onClick={e => props.addStage('Out')}>Out</DropdownItem>
                <DropdownItem disabled={last.name === 'Hold'} onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
            </DropdownMenu>
        )

    if (breathingPos === 0)
        return (
            <DropdownMenu>
                <DropdownItem onClick={e => props.addStage('In')}>In</DropdownItem>
                <DropdownItem disabled onClick={e => props.addStage('Out')}>Out</DropdownItem>
                <DropdownItem disabled={last.name === 'Hold'} onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
            </DropdownMenu>
        )

    return (
        <DropdownMenu>
            <DropdownItem onClick={e => props.addStage('In')}>In</DropdownItem>
            <DropdownItem onClick={e => props.addStage('Out')}>Out</DropdownItem>
            <DropdownItem disabled onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
        </DropdownMenu>
    )
}

export default BreathingStageDropDown;