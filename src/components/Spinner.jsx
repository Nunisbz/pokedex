import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const SpinnerCircle = styled(motion.div)`
  width: 40px; /* Ajuste o tamanho conforme desejado */
  height: 40px;
  border: 4px solid #f3f3f3; /* Cor da borda */
  border-top: 4px solid #e74c3c; /* Cor da parte animada da borda */
  border-radius: 50%;
  animation: spin 1s linear infinite; /* Animação de rotação */

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerCircle />
    </SpinnerContainer>
  );
};

export default Spinner;
