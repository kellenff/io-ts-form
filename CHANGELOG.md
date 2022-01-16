# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Support for `io-ts/Codec/Codec` to validate and conform the form's values

### Changed

- Replace initial form values with form codec

### Removed

- `UseFormValue.setIsValid` as imperative management of validity state is removed

## [0.1.0] - 2022-01-15

### Added

- `useForm` hook for building controlled forms
- Option `type` for naive object validation of form values

[unreleased]: https://github.com/rakenodiax/io-ts-form/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/rakenodiax/io-ts-form/releases/tag/v0.1.0
