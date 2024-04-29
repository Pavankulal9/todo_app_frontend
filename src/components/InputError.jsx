
const InputError = ({error}) => {
  return (
    error?<div className='input-error'><p>{error}</p></div>:null
  )
}

export default InputError
