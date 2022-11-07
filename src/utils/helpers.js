export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
		style:'currency',
		currency:'USD'
	}).format(number / 100)
	return newNumber
}

export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => item[type])
	//now for colors there are in an array inside an array so we need to flatten it
	if(type === 'colors') {
		unique = unique.flat() //use js vanilla with flat() 
	}
	return ['all', ...new Set(unique)] //We start with 'all' and then apply js vanilla set() for the unique values, with no repetition since the data array, for example, has category kitchen 5 times, we only need to display and use that category one time
}
