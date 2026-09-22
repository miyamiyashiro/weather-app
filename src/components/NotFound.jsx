const NotFound = ({ message }) => (
    <div className="error-message" style={{ textAlign: 'center', color: '#ff6b6b', margin: '20px 0' }}>
      <p>{message || 'Cidade não encontrada.'}</p>
    </div>
  )
  export default NotFound