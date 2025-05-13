import React from 'react';
import { Button, Input } from 'antd';

const LifeCycle = () => {
    return (
        <div style={{
            padding: '20px',
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: '#f7f9fc',
            minHeight: '100vh'
        }}>
            <h1 style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                color: '#333',
                marginBottom: '30px'
            }}>
                Intern Profile - Life Cycle
            </h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px'
            }}>
                <Input.Search
                    placeholder="Search for an intern..."
                    style={{
                        width: '40%',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </div>
            <div style={{
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ffffff, #e7e9eb)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '1.8rem',
                    color: '#444',
                    marginBottom: '20px'
                }}>
                    Intern CV Request
                </h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <div>
                        <p><strong>Application Reference Number:</strong> 12345</p>
                        <p><strong>Intern Full Name:</strong> John Doe</p>
                        <p><strong>Intern Name with Initials:</strong> J. Doe</p>
                        <p><strong>Intern Status:</strong> Active</p>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#007bff',
                                borderColor: '#0056b3',
                                borderRadius: '5px',
                                marginRight: '10px'
                            }}
                        >
                            View CV
                        </Button>
                        <Button
                            type="default"
                            style={{
                                borderRadius: '5px',
                                backgroundColor: '#f8f9fa',
                                borderColor: '#dee2e6'
                            }}
                        >
                            Show CV
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LifeCycle;
