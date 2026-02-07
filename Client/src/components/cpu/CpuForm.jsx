import { useState } from 'react';
import styled from 'styled-components';
import { borderColor, formBackgroundColor, secondaryColor } from '../../utils/colors';
import { initialCpuFormData } from '../../utils/cpuDataHelper';
import CpuFormBottom from './CpuFormBottom';
import CpuFormTimeInput from './CpuFormTimeInput';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    background: ${formBackgroundColor};
    border-radius: 8px;
    width: 580px;
`;

const FormLine = styled.div`
    display: flex;
    flex-direction: row;
    align-items: top;
    gap: 12px;
`;

const Label = styled.div`
    width: 100px;
    color: ${secondaryColor};
    font-weight: 500;
`;

const StyledInput = styled.input`
    padding: 8px 12px;
    border: 1px solid ${borderColor};
    border-radius: 4px;
    font-size: 14px;
    flex: 1;
    
    &:focus {
        outline: none;
        border: 2px solid ${secondaryColor};
    }
`;

function CpuForm({ setCpuDataResp }) {
    const [cpuFormData, setCpuFormData] = useState(initialCpuFormData);

    const handleInputChange = (e) => {
        const { name, value } = e?.target;
        setCpuFormData({ ...cpuFormData, [name]: value });
    };

    const handleSelectChange = (key) => (option) => {
        setCpuFormData({ ...cpuFormData, [key]: option ? option.value : '' });
    };

    const getSelectedOption = (value, options) => value ? options.find(opt => opt.value === value) : null;

    return (
        <FormWrapper>
            <FormLine>
                <Label>IP Address:</Label>
                <StyledInput
                    name='ip'
                    value={cpuFormData.ip}
                    onChange={handleInputChange}
                    placeholder='Enter IP address'
                />
            </FormLine>
            <FormLine>
                <CpuFormTimeInput
                    label={'Time Period:'}
                    info={'(i) Minimum period time is 10 min.'}
                    valueName={'timePeriodValue'}
                    unitName={'timePeriodUnit'}
                    formData={cpuFormData}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    getSelectedOption={getSelectedOption}
                    conditionalMinValue={10}
                />
            </FormLine>
            <FormLine>
                <CpuFormTimeInput
                    label={'Interval:'}
                    info={'(i) Interval must be in multiple of 5 min.'}
                    valueName={'intervalValue'}
                    unitName={'intervalUnit'}
                    formData={cpuFormData}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    getSelectedOption={getSelectedOption}
                    conditionalMinValue={5}
                    conditionalStep={5}
                />
            </FormLine>
            <CpuFormBottom cpuFormData={cpuFormData} setCpuDataResp={setCpuDataResp} setCpuFormData={setCpuFormData} />
        </FormWrapper>
    )
}

export default CpuForm;