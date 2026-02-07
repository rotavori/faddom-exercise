import { useState } from 'react';
import styled from 'styled-components';
import CpuForm from '../../components/cpu/CpuForm';
import CpuGraph from '../../components/cpu/CpuGraph';
import { primaryColor } from '../../utils/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 28px;
  margin: 14px;
  font-weight: bold;
  color: ${primaryColor};
`;

function HomePage() {
  const [cpuDataResp, setCpuDataResp] = useState(null);

  return (
    <Wrapper>
      <Title>CPU Usage Over Time</Title>
        <CpuForm setCpuDataResp={setCpuDataResp}/>
        {cpuDataResp && <CpuGraph cpuData={cpuDataResp}/>}
    </Wrapper>
  );
}

export default HomePage;