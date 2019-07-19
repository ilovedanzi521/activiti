DROP PROCEDURE IF EXISTS win_delete_pk;

-- 删除主键
DELIMITER //
CREATE PROCEDURE win_delete_pk (
	IN p_table_name VARCHAR(200)
)
BEGIN
	-- 调用重建索引
	call win_rebuild_idx(p_table_name, 'PRIMARY', '');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS win_rebuild_pk;

-- 重建主键
DELIMITER //
CREATE PROCEDURE win_rebuild_pk (
	IN p_table_name VARCHAR(200),
	IN p_col_name VARCHAR(200)
)
BEGIN
	-- 调用重建索引
	call win_rebuild_idx(p_table_name, 'PRIMARY', p_col_name);
	
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS win_delete_idx;

-- 删除索引
DELIMITER //
CREATE PROCEDURE win_delete_idx (
	IN p_table_name VARCHAR(200), 
	IN p_idx_name VARCHAR(200)
)
BEGIN
	-- 调用重建索引
	call win_rebuild_idx(p_table_name, p_idx_name, '');
	
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS win_rebuild_idx;

DELIMITER //
CREATE PROCEDURE win_rebuild_idx (
	IN p_table_name VARCHAR(200), 
	IN p_idx_name VARCHAR(200), 
	IN p_col_name VARCHAR(200)
)
BEGIN
	DECLARE delete_idx VARCHAR(250);
	DECLARE create_idx VARCHAR(250);

	-- 判断索引是否存在
	SELECT COUNT(1)
	INTO @cnt
	FROM information_schema.statistics
	WHERE table_name = p_table_name
		AND index_name = p_idx_name;

	-- 删除索引
	IF @cnt > 0 THEN

		IF (p_idx_name = 'PRIMARY') THEN
			SET @delete_idx = concat(' alter table ', p_table_name, ' drop primary key');
		ELSE
			SET @delete_idx = concat(' drop index ', p_idx_name, ' on ', p_table_name);
		END IF;
		
		PREPARE stmt FROM @delete_idx;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;

	END IF;
	
	-- 重建索引
	IF LENGTH(p_col_name) > 0 THEN

		IF (p_idx_name = 'PRIMARY') THEN
			SET @create_idx = concat(' alter table ', p_table_name, ' add primary key', '(', p_col_name, ')');
		ELSE
			SET @create_idx = concat(' create index ', p_idx_name, ' on ', p_table_name, '(', p_col_name, ')');
		END IF;
		
		PREPARE stmt FROM @create_idx;
		EXECUTE stmt;
	  DEALLOCATE PREPARE stmt;
		
	END IF;
	
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS win_delete_column;

-- 删除列
DELIMITER //
CREATE PROCEDURE win_delete_column (
	IN p_table_name VARCHAR(100),
	IN p_column_name VARCHAR(100)
)
BEGIN

	DECLARE delete_column VARCHAR(250);

	SELECT COUNT(1)
	INTO @cnt
	FROM information_schema.columns
	WHERE table_name = p_table_name
		AND column_name = p_column_name;

	-- 删除列
	IF @cnt > 0 THEN
		SET @delete_column = concat(' alter table ', p_table_name, ' drop column ', p_column_name);

		PREPARE stmt FROM @delete_column;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
	END IF;
	
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS win_add_column;

-- 新增列
DELIMITER //
CREATE PROCEDURE win_add_column (
	IN p_table_name VARCHAR(100),
	IN p_column_name VARCHAR(100),
	IN p_stmt VARCHAR(200)
)
BEGIN

	DECLARE add_column VARCHAR(250);

	SELECT COUNT(1)
	INTO @cnt
	FROM information_schema.columns
	WHERE table_name = p_table_name
		AND column_name = p_column_name;

	-- 新增列
	IF @cnt = 0 THEN
		SET @add_column = p_stmt;

		PREPARE stmt FROM @add_column;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
	END IF;
	
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS win_change_column_name;

-- 更新列名
DELIMITER //
CREATE PROCEDURE win_change_column_name (
	IN p_table_name VARCHAR(100),
	IN p_column_name VARCHAR(100),
	IN p_to_column_name VARCHAR(100),
	IN p_stmt VARCHAR(200)
)
BEGIN

	DECLARE change_column VARCHAR(250);

	SELECT COUNT(1)
	INTO @cnt
	FROM information_schema.columns
	WHERE table_name = p_table_name
		AND column_name = p_column_name;

	SELECT COUNT(1)
	INTO @to_cnt
	FROM information_schema.columns
	WHERE table_name = p_table_name
		AND column_name = p_to_column_name;

	-- 新增列
	IF (@cnt > 0 && @to_cnt = 0) THEN
		SET @change_column = p_stmt;

		PREPARE stmt FROM @change_column;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;

	END IF;
	
END //
DELIMITER ;