
const domainErrors = require('../domainErrors');
const TimeService = require('../TimeService');
 
const timeService = new TimeService()

test('correct weekday is fetched', () => {
  const timeService = new TimeService()
  const weekday = timeService.getWeekday('2022-12-31')
  expect(weekday).toBe("Saturday")
});

test('error is thrown for non-iso format', () => {
  try {
    timeService.getWeekday('22/12/2022')
  } catch(err) {
    expect(err.name).toBe(new domainErrors.IsoDateFormatError().name)
  }
});

test('error is thrown for invalid dates', () => {
  try {
    timeService.getWeekday('2022-12-32')
  } catch(err) {

    expect(err.name).toBe(new domainErrors.IsoDateFormatError().name)
  }
});
