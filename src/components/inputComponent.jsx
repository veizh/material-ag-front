

const InputComp = ({type,ref,name,label,pattern,className})=>{


    return(
        <form  className="input__container">
            <input type={type} className={className && className} ref={ref} id={name} name={name} pattern={pattern&&pattern} autoComplete="off"  placeholder={label} />
        </form>
    )
}
export default InputComp