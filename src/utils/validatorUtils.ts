import {db} from "@/utils/db";
import {ORGS_DEVICE_COLLECTION_NAME, ORGS_DOC_COLLECTION_NAME} from "@/utils/common";
import {UserPermissionLevel} from "@/utils/types";

function NON_ZERO(value: number) {
	return value != 0
}

function NON_NEGATIVE(value: number) {
	return value >= 0
}

function NON_ZERO_NON_NEGATIVE(value: number) {
	return value > 0
}

function NON_ZERO_NON_POSITIVE(value: number) {
	return value < 0
}

function PASSTHROUGH<T>(value: T) {
	return true
}

function STRLEN_GT(len: number) {
	return (value: string) => {
		return value.length > len
	}
}

function STRLEN_GT_EQ(len: number) {
	return (value: string) => {
		return value.length >= len
	}
}

function STRLEN_EQ(len: number) {
	return (value: string) => {
		return value.length == len
	}
}

function STRLEN_LT_EQ(len: number) {
	return (value: string) => {
		return value.length <= len
	}
}

function STRLEN_LT(len: number) {
	return (value: string) => {
		return value.length < len
	}
}

function STRLEN_NZ(value: string) {
	return value.length > 0
}

function ALLOW_UNDEFINED_WITH_FN<T>(fn: (value: T) => (boolean | Promise<boolean>)) {
	return function (value: T | undefined) {
		if (!value) {
			return true
		} else {
			return fn(value)
		}
	}
}

function IN_ARR<T>(elemArray: T[]) {
	return function (value: T) {
		return elemArray.includes(value)
	}
}

function NOT_IN_ARR<T>(elemArray: T[]) {
	return function (value: T) {
		return !elemArray.includes(value)
	}
}

async function VALID_ORG_ID(orgId: string) {
	const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const orgDocRef = orgCollection.doc(orgId)
	const orgDocData = await orgDocRef.get()
	if (orgDocData.exists === false) {
		return false
	}
	return true
}

function VALID_DEVICE_ID(orgId: string) {
	return async function (deviceId: string) {
		const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
		const orgDocRef = orgCollection.doc(orgId)
		const orgDeviceCollection = orgDocRef.collection(ORGS_DEVICE_COLLECTION_NAME)
		const orgDeviceDocRef = orgDeviceCollection.doc(deviceId)
		const orgDocData = await orgDeviceDocRef.get()
		if (orgDocData.exists === false) {
			return false
		}
		return true
	}
}

function VALID_PERM_LEVEL(permValue: UserPermissionLevel) {
	const validationFn = GT_MIN_LT_MAX(
		UserPermissionLevel.GUEST,
		UserPermissionLevel.SUPERUSER
	)
	return validationFn(permValue)
}

function GT_MIN_LT_MAX(min: number, max: number) {
	return function (value: number) {
		if (value >= min && value <= max) {
			return true
		}
		return false
	}
}

enum PARSE_METHOD {
	PARSE_FLOAT,
	PARSE_INT
}

function STRING_TO_NUM(handlerFn: (number: number) => (boolean | Promise<boolean>), parseMethod: PARSE_METHOD = PARSE_METHOD.PARSE_INT) {
	return async function (value: string) {
		const parsedValueFn = [
			Number.parseFloat,
			Number.parseInt
		][parseMethod]
		const parsedValue = parsedValueFn(value)
		if (Number.isNaN(parsedValue)) {
			return false
		}
		if (!Number.isFinite(parsedValue)) {
			return false
		}
		return handlerFn(parsedValue)
	}
}

export {
	NON_ZERO,
	NON_NEGATIVE,
	NON_ZERO_NON_NEGATIVE,
	NON_ZERO_NON_POSITIVE,
	
	PASSTHROUGH,
	ALLOW_UNDEFINED_WITH_FN,
	
	STRLEN_LT,
	STRLEN_GT,
	STRLEN_EQ,
	STRLEN_LT_EQ,
	STRLEN_GT_EQ,
	STRLEN_NZ,
	
	IN_ARR,
	NOT_IN_ARR,
	VALID_ORG_ID,
	VALID_DEVICE_ID,
	VALID_PERM_LEVEL,
	GT_MIN_LT_MAX,
	STRING_TO_NUM
}