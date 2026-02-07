import { useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { borderColor, secondaryColor } from '../../utils/colors';
import { timeUnitOptions } from '../../utils/cpuDataHelper';

const Label = styled.div`
    width: 100px;
    color: ${secondaryColor};
    font-weight: 500;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.input`
    padding: 8px 12px;
    border: 1px solid ${borderColor};
    border-radius: 4px;
    font-size: 14px;
    flex: 1;
    width: 210px;
    
    &:focus {
        outline: none;
        border: 2px solid ${secondaryColor};
    }
`;

const Info = styled.div`
    color: ${secondaryColor};
    font-size: 12px;
`;

const SelectWrapper = styled.div`
    flex: 1;
`;

function CpuFormTimeInput({
    label,
    info,
    valueName,
    unitName,
    formData,
    handleInputChange,
    handleSelectChange,
    getSelectedOption,
    conditionalMinValue,
    conditionalStep
}) {
    const isMinutes = formData[unitName] === 60;
    const minValue = isMinutes ? conditionalMinValue : 1;
    const stepValue = isMinutes ? conditionalStep ?? 1 : 1;

    useEffect(() => {
        if (isMinutes) {
            correctInputValue(Number(formData[valueName]));
        }
    }, [isMinutes]);

    //"five-minute intervals used in Amazon EC2 basic monitoring."
    //https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-metrics-basic-detailed.html
    const correctInputValue = (value) => {
        let correctedValue = value;

        if (correctedValue < minValue) {
            correctedValue = minValue;
        }

        if (correctedValue % stepValue !== 0) {
            correctedValue = Math.round(correctedValue / stepValue) * stepValue;
            if (correctedValue < minValue) {
                correctedValue = minValue;
            }
        }

        if (correctedValue !== value) {
            const correctedEvent = {
                target: {
                    name: valueName,
                    value: correctedValue
                }
            };
            handleInputChange(correctedEvent);
        }
    };

    const onInputBlur = (e) => {
        const value = Number(e.target.value);
        correctInputValue(value);
    };

    return (
        <>
            <Label>{label}</Label>
            <InputWrapper>
                <StyledInput
                    name={valueName}
                    type='number'
                    min={minValue}
                    step={stepValue}
                    value={formData[valueName]}
                    onChange={handleInputChange}
                    onBlur={onInputBlur}
                    placeholder='Enter number'
                />
                <Info>{info}</Info>
            </InputWrapper>
            <SelectWrapper>
                <Select
                    options={timeUnitOptions}
                    value={getSelectedOption(formData[unitName], timeUnitOptions)}
                    onChange={handleSelectChange(unitName)}
                    placeholder={'Select time unit'}
                    isClearable={true}
                />
            </SelectWrapper>
        </>
    );
}

export default CpuFormTimeInput;
