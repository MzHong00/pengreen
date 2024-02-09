export default function SubmitButton({formRef}) {

    return <input 
                type="button"
                value='생성'
                className={`w-[10%] h-full flex justify-center items-center bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl shadow-lg cursor-pointer hover:shadow-inner text-sm`}></input>
}