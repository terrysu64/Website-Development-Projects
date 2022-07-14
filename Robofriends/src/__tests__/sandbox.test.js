import '@testing-library/jest-dom'


it('gets data', () => {
    expect.assertions(2)

    const mockFetch = jest.fn()
    .mockReturnValue(Promise.resolve({
            count: 87,
            results: [0,1,2,3,4]
    }))

    // mockFetch().then((data) => {
    //     console.log(data)
    // })

    return mockFetch().then((data) => {
        expect(mockFetch.mock.calls.length).toBe(1)
        expect(data.count).toBeGreaterThan(3)
    })

})

// describe('db', () => {
//     it('should make db run', () => {
//         const query = helper('dog')
//         expect(query).toEqual(['dog'])
//     })
    
//     it('should run with null', () => {
//         const query = helper(undefined)
//         expect(query).toEqual([])
//     })
// })

