	
const IsoDate = require('../IsoDate');
const domainErrors = require('../domainErrors')
 
test('correct weekday is fetched', () => {
  const date = new IsoDate('2022-12-31')
  expect(date.getWeekday()).toBe("Saturday")
});

test('error is thrown for non-iso format', () => {
  try {
    new IsoDate('22/12/2022')
  } catch(err) {

    expect(err.name).toBe(new domainErrors.IsoDateFormatError().name)
  }
});

test('error is thrown for invalid dates', () => {
  try {
    new IsoDate('2022-12-32')
  } catch(err) {

    expect(err.name).toBe(new domainErrors.IsoDateFormatError().name)
  }
});
