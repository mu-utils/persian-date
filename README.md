# persian-date
A Persian date to convert from gregorian and behavie like a date in Javascript project.

## Description
Persian date is a simple, easy-to-use, fully customizable date picker component for web applications. Persian date can be easily integrated into your project, whether you need a basic date input or a complex, multi-feature calendar interface.

## Installation
### Via npm
```bash
npm install persian-datepicker
```

### Via yarn
```bash
yarn add persian-datepicker
```

### Options
| Option      | Type     | Default       | Description                                          |
|-------------|----------|---------------|------------------------------------------------------|
| `format`    | String   | `MM/DD/YYYY`  | The format in which the selected date will be displayed in the input field. |
| `minDate`   | Date     | `null`        | The earliest date that can be selected.              |
| `maxDate`   | Date     | `null`        | The latest date that can be selected.                |
| `onSelect`  | Function | `null`        | A callback function that is triggered when a date is selected. The selected date is passed as an argument. |

### Basic Example in React
```jsx
import React, { useEffect } from 'react';
import DatePicker from 'path/to/datepicker.js';
import 'path/to/datepicker.css';

const DatePickerComponent = () => {
  useEffect(() => {
    const datepicker = new DatePicker('#date-picker', {
      format: 'MM/DD/YYYY',
      onSelect: function (date) {
        console.log('Selected date:', date);
      },
    });
  }, []);

  return <input type="text" id="date-picker" />;
};

export default DatePickerComponent;
```


### Explanation:
1. **`useEffect` Hook**: This ensures that the datepicker is initialized after the component mounts.
2. **Import Statements**: The `DatePicker` component and its CSS file are imported at the top.
3. **`input` Element**: The `id="date-picker"` is linked to the DatePicker instance in the `useEffect` hook.

This example should help users understand how to integrate the date picker into a React component.


## Contact
For more information, feel free to reach out via [email@example.com](mailto:email@example.com) or visit our [GitHub Discussions](https://github.com/username/datepicker-js/discussions).
