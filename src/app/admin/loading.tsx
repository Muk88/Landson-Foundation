export default function AdminLoading() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: '1rem'
        }}>
            <div className="spinner" style={{ width: '50px', height: '50px' }}></div>
            <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', fontWeight: 500 }}>
                Loading...
            </p>
        </div>
    )
}
