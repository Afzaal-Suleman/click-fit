CREATE PROCEDURE addUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type ENUM('admin', 'trainer', 'member'),
    IN p_active BOOLEAN
)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, p_active);
    
    SELECT LAST_INSERT_ID() AS newUserId;
END //

CALL addUser('admin@clickfit.com', 'hashed_password_123', 'admin', TRUE);
CALL addUser('trainer@clickfit.com', 'hashed_password_456', 'trainer', TRUE);
CALL addUser('member@clickfit.com', 'hashed_password_789', 'member', TRUE);
CALL addUser('john.doe@example.com', 'hashed_password_abc', 'member', TRUE);
CALL addUser('jane.smith@example.com', 'hashed_password_def', 'member', FALSE);
