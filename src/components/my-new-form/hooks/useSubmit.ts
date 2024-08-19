// custom hook



export const useSubmit = (setSum: any) => {


    const calculateSum = (ada: number, b: number) => {
        setSum(ada + b)
    }

    return {
        calculateSum
    }
}