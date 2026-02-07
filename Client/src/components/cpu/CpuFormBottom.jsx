import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { initialCpuFormData, validateCpuForm } from '../../utils/cpuDataHelper';
import { errorColor } from '../../utils/colors';
import Button from '../general/Button';
import { fetchCpuUsage } from '../../actions/cpuActions';

const CpuFormBottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ErrorLabel = styled.div`
    font-size: 12px;
    color: ${errorColor};
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-top: 8px;
`;

function CpuFormBottom({ cpuFormData, setCpuDataResp, setCpuFormData }) {
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const isResetDisabled = useMemo(() => {
        return JSON.stringify(cpuFormData) === JSON.stringify(initialCpuFormData);
    }, [cpuFormData]);

    useEffect(() => {
        const validation = validateCpuForm(cpuFormData);
        setErrorMsg(validation.error);
        setIsSubmitDisabled(!validation.isValid);
    }, [cpuFormData]);

    const handleSubmission = async () => {
        const validation = validateCpuForm(cpuFormData);
        if (!validation.isValid) {
            return;
        }

        try {
            setErrorMsg('');
            const resp = await fetchCpuUsage(cpuFormData);
            setCpuDataResp(resp);
        } catch (error) {
            setCpuDataResp(null);
            setErrorMsg('Failed to fetch cpu usage data.');
        }

    };

    const handleReset = () => {
        setCpuFormData(initialCpuFormData);
    };

    return (
        <CpuFormBottomWrapper>
            <ErrorLabel>{errorMsg}</ErrorLabel>
            <ButtonGroup>
                <Button label={'Submit'} onClick={handleSubmission} isDisabled={isSubmitDisabled} />
                <Button label={'Reset'} onClick={handleReset} isDisabled={isResetDisabled} />
            </ButtonGroup>
        </CpuFormBottomWrapper>
    );
}

export default CpuFormBottom;