import Part from "./Part"
import Total from "./Total"

const Content = ({parts}) => {
return (
    <div>
       {parts.map(part => {
        return <Part key={part.id} name={part.name} exercises={part.exercises}/>
       })}
       <Total parts={parts}/>
    </div>
)}
export default Content