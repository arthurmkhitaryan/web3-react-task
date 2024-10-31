import React from 'react';
import Modal from 'react-modal';
import './modal.css'

Modal.setAppElement('#root');

function TokenInfoModal({ isOpen, closeModal, tokenInfo, tokenInfoError }) {
  if (!tokenInfo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          padding: '60px',
          borderRadius: '10px',
          backgroundColor: '#191919',
          border:'none'
        },
      }}
    >
        <div>
            {!tokenInfoError ? (
                <>
                    <h2 className='token-info-title'>Token Information</h2>
                    <p><strong>Name:</strong> {tokenInfo.name}</p>
                    <p><strong>Symbol:</strong> {tokenInfo.symbol}</p>
                    <p><strong>Type:</strong> {tokenInfo.type}</p>
                    <p><strong>Holders:</strong> {tokenInfo.holders}</p>
                    <p><strong>Total Transfers:</strong> {tokenInfo.total_transfers}</p>
                    <p><strong>Max Total Supply:</strong> {tokenInfo.max_total_supply}</p>
                    <p><strong>Decimals:</strong> {tokenInfo.decimals}</p>
                    <p><strong>Contract Address:</strong> {tokenInfo.contract_address}</p>
                </>
            ): (
                <h2 className='token-info-title'>Token info is not found!</h2>
            )}

            <div className='close-btn-wrapper'>
                <button className='close-btn' onClick={closeModal}>Close</button>
            </div>
        </div>
    </Modal>
  );
}

export default TokenInfoModal;
