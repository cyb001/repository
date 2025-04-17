import styles from './index.less';
import React, { useState } from 'react';

interface ModalProps {
    visible: boolean;
    onOk: (name: string) => void;
    onCancel: () => void;
}

export default function KnowledgeCreatingModal({ visible, onOk, onCancel }: ModalProps) {
    const [name, setName] = useState('');

    return (
        <div className={`${styles.modal} ${visible ? styles.visible : ''}`}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>创建知识库</h2>
                <input
                    type="text"
                    placeholder="请输入知识库名称（必填）"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.buttonGroup}>
                    <button
                        onClick={onCancel}
                        className={styles.cancelBtn}
                    >
                        取消
                    </button>
                    <button
                        onClick={() => name.trim() && onOk(name.trim())}
                        className={styles.okBtn}
                        disabled={!name.trim()}
                    >
                        确定
                    </button>
                </div>
            </div>
        </div>
    );
}

// Removed conflicting local useState declaration
